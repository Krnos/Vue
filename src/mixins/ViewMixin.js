/* eslint-disable prettier/prettier */
import parseDeleteMany from '../utils/parseDeleteMany'
import parseVuexObject from '../utils/parseVuexObject'
import { camelCase, snakeCase } from 'change-case'
import pluralize from 'pluralize'

export default {
  channel: this.pascalCaseSigular,
  echo: {
    'updated': (payload, vm) => {
      this.updateRecord(payload.model)
    }
  },
  data: () => ({
    currentPage: 1,
    isModalAdd: true,
    form: {},
    selected: [],
    filtersClear: {}
  }),
  computed: {
    pascalCaseSigular () {
      return pluralize.singular(this.$options.name)
    },
    snakeCaseSingular () {
      return snakeCase(this.pascalCaseSigular)
    },
    snakeCasePlural () {
      return snakeCase(this.$options.name)
    },
    camelCasePlural () {
      return camelCase(this.$options.name)
    },
    searchPlaceholder () {
      let t = this
      let concatColumns = Object.keys(this.filters.where).reduce((str, column, index) => {
        if (column !== 'param' && index < Object.keys(t.filters.where).length - 2) {
          return index > 0
            ? `${str}, ${t.$t(t.snakeCasePlural + '.' + column)}`
            : `${str} ${t.$t(t.snakeCasePlural + '.' + column)}`
        }
        return str
      }, '')
      return this.$t('strings.search', {
        attribute: this.$t('strings.' + this.snakeCaseSingular),
        columns: concatColumns,
        column: this.$t(
          this.snakeCasePlural + '.' +
          Object.keys(this.filters.where)[Object.keys(t.filters.where).length - 2]
        )
      })
    },
    enabledDelete () {
      return this.selected.length > 0
    },
    total () {
      return this.selected.reduce((prev, cur) => prev + parseFloat(cur.total), 0).toFixed(2)
    }
  },
  watch: {
    currentPage (currentPage) {
      this.getRecords(currentPage)
    },
    filterParams (filter) {
      this.hiddeDrop()
      filter.length === 0 && (this.filters = parseVuexObject(this.filtersClear))
      this.selected = []
      this.currentPage = 1
      this.getRecords(this.currentPage)
    }
  },
  async created () {
    this.filtersClear = parseVuexObject(this.filters)
    await this.getRecords(1)
    this.getCatalog()
  },
  methods: {
    colorStatus (code) {
      return this.status.find(e => e.value === code)['color']
    },
    setFocusSearch () {
      this.$refs.search.$refs.vminput.focus()
    },
    editShortcut () {
      if (this.selected.length === 0 || this.selected.length > 1) return
      const idx = this[this.camelCasePlural].findIndex(u => u.id === this.selected[0].id)
      this.editRecord(this.selected[0], idx)
    },
    addRecord () {
      this.isModalAdd = true
      this.setModalVisible(true)
      this.form = {}
    },
    editRecord (record, index) {
      this.isModalAdd = false
      this.setModalVisible(true)
      this.form = { ...record }
    },
    async deleteRecordConfirm (record) {
      let t = this
      this.auxDeleteRecord = () => {
        t.deleteRecord(record).then(() => {
          t.selected = []
        })
      }
      this.$vm.dialog({
        color: 'danger',
        title: this.$t('front.delete_modal'),
        text: this.$t('front.delete_confirmation2', {
          model: this.$t('strings.' + this.snakeCaseSingular),
          attribute: this.$t(record[this.attributeModal])
        }),
        accept: this.auxDeleteRecord
      })
    },
    async deleteRecordsConfirm () {
      let t = this
      let recordsMany = parseDeleteMany(this.selected, this.attributeModal)
      this.auxDeleteRecord = () => {
        t.deleteRecords(recordsMany).then(() => {
          t.selected = []
        })
      }
      this.$vm.dialog({
        color: 'danger',
        title: this.$t('front.delete_modal'),
        text: this.$t('front.delete_confirmation', {
          model: this.$t('strings.' + this.snakeCaseSingular),
          attribute: recordsMany.values
        }),
        accept: this.auxDeleteRecord
      })
    },
    async setActionRecord (record, action) {
      record.id && this.actionRecord({ id: record.id, action })
    },
    async getRecords (page) {
      let t = this
      await this.loadRecords({ page }).then(data => t.getProps(t.$route.params.id))
    },
    getProps (index) {
      let record = this[this.camelCasePlural].filter(record => record.id === parseInt(index))[0]
      record && this.editRecord(record, index)
    },
    async getCatalog () {
      this.catalog && Object.keys(this.catalog).forEach(e => this.loadCatalog({ url: e, filter: '' }))
    },
    autoCompleteFunc (value, url) {
      this.loadCatalog({ filter: value, url: url })
    },
    newObjectFuncModal (value) {
      //
    },
    newObjectFuncView (value) {
      //
    },
    handleChange (date) {
      this.filters.betweenDates.created_at = date
    },
    hiddeDrop () {
      let [dropdownMenu] = this.$refs.dropdown.$children.filter(item => {
        return item.hasOwnProperty('dropdownVisible')
      })
      dropdownMenu.dropdownVisible = false
    }
  }
}

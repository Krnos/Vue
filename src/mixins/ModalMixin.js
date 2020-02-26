import { snakeCase } from 'change-case'
import pluralize from 'pluralize'

export default {
  props: {
    form: {
      default: () => ({}),
      type: Object
    },
    isAdd: {
      default: true,
      type: Boolean
    }
  },
  computed: {
    getTitle () {
      return this.isAdd ? this.$t(this.snakeCasePlural + '.add') : this.$t(this.snakeCasePlural + '.edit')
    },
    model () {
      return this.$options.name.replace('Modal', '')
    },
    pascalCaseSigular () {
      return pluralize.singular(this.model)
    },
    snakeCaseSingular () {
      return snakeCase(this.pascalCaseSigular)
    },
    snakeCasePlural () {
      return snakeCase(this.model)
    }
  },
  methods: {
    saveRecord () {
      this.isAdd ? this.addRecord(this.form) : this.editRecord(this.form)
    },
    async deleteRecordConfirm (record) {
      let t = this
      this.auxDeleteRecord = () => {
        t.deleteRecord(record)
      }
      this.$vm.dialog({
        color: 'danger',
        title: this.$t('front.delete_modal'),
        text: this.$t('front.delete_confirmation2', {
          model: this.$t('strings.' + this.snakeCaseSingular),
          attribute: this.$t(record.name)
        }),
        accept: this.auxDeleteRecord
      })
    },
    async getCatalog () {
      this.catalog && Object.keys(this.catalog).forEach(e => this.loadCatalog({ url: e, filter: '' }))
    },
    autoCompleteFunc (value, url) {
      this.loadCatalog({ filter: value, url: url })
    },
    close () {
      this.setModalVisible(false)
    }
  }
}

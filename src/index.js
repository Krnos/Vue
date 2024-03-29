/* eslint-disable prettier/prettier */
import Echo from 'laravel-echo'

let echoOptions = {
  broadcaster: 'pusher',
  csrfToken: document.head.querySelector('meta[name="csrf-token"]'),
  cluster: 'us3',
  encrypted: true,
  forceTLS: true,
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('default_auth_token')}`
    }
  }
}

export default {
  install (Vue, options) {
    if (options) {
      if (typeof options !== 'object') {
        throw new Error('[Krnos/Vue] cannot initiate options')
      }

      if (options.hasOwnProperty('echo')) {
        if (typeof options.echo.socketId === 'function') {
          Vue.prototype.$echo = options.echo
        } else {
          Vue.prototype.$echo = new Echo(Object.assign({}, echoOptions, options.echo))
        }
      }
    }

    Vue.mixin({
      mounted () {
        let channel = this.$options['channel']

        if (channel) {
          if (channel.startsWith('private:')) {
            this.channel = this.$echo.private(channel.replace('private:', ''))
          } else if (channel.startsWith('presence:')) {
            this.channel = this.$echo.join(channel.replace('presence:', ''))
          } else {
            this.channel = this.$echo.channel(channel)
          }

          let events = this.$options['echo']

          if (events) {
            Object.keys(events).forEach(function (key) {
              // Bind the VM as second parameter
              this.channel.listen(key, payload => {
                events[key](payload, this)
              })
            }, this)
          }
        }
      },
      beforeDestroy () {
        let channel = this.$options['channel']

        if (channel) {
          if (channel.startsWith('private:')) {
            channel = channel.replace('private:', '')
          } else if (channel.startsWith('presence:')) {
            channel = channel.replace('presence:', '')
          }

          this.$echo.leave(channel)
        }
      }
    })
  }
}

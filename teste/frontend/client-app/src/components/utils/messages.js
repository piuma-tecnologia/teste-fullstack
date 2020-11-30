import { Notify } from 'quasar'

export const toastr = () => {
    Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 2000,
        position: 'top-right',
        message: 'test'
    })
}
import factory from '../factory'
import style from './style.scss'

export default factory('UiCard', 'card', style)
export const CardHeader = factory('UiCardHeader', 'header', style)
export const CardBody = factory('UiCardHeader', 'body', style)


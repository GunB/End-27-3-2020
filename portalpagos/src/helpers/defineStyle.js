import SITE_MESSAGE from 'constants/site_message'

export const isAutoStyleNoneDefault = auto =>
  auto ? SITE_MESSAGE.STYLE.NONE : SITE_MESSAGE.STYLE.DEFAULT

export const autoStyle = {
  isAutoStyleNoneDefault,
}

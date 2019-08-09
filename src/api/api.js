import axios from 'axios'

const BASE_URL = '';
const HOME_PAGE_URL = `/api/v4/tabs/selected`;
const VIDEO_CATEGORY_URL = `/api/v4/discovery/category`;
const VIDEO_HOT = `/api/v4/discovery/hot`;
const VIDEO_DETAIL_URL = `/api/v1/video/`;
const RELATE_VIDEO_LIST_URL = `/api/v1/video/related/`;
const REPLIES_VIDEO_LIST_URL = `/api/v1/replies/video?id=`
const SEARCH_URL = `/api/v1/search?num=15&query=`


export {
  BASE_URL,
  HOME_PAGE_URL,
  VIDEO_CATEGORY_URL,
  VIDEO_HOT,
  VIDEO_DETAIL_URL,
  RELATE_VIDEO_LIST_URL,
  REPLIES_VIDEO_LIST_URL,
  SEARCH_URL
}

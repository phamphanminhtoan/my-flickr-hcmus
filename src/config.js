// Giáo viên chấm bài vui lòng thay API_KEY khác nếu key dưới đây hết hạn tại thời điểm chấm bài.Link get key: https://www.flickr.com/services/api/explore/flickr.interestingness.getList
// Em xin cảm ơn
export const API_URL = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=2424e5e2553925fe2b64d19b4f52ec3b&extras=tags%2C+url_s%2C+url_l%2C+owner_name%2C+views&format=json&nojsoncallback=1"
export const API_TAG = "https://api.flickr.com/services/rest/?method=flickr.tags.getRelated&api_key=2424e5e2553925fe2b64d19b4f52ec3b&tag=london&format=json&nojsoncallback=1"
export const API_SEARCH = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2424e5e2553925fe2b64d19b4f52ec3b&tags=paris&extras=tags%2C+url_s%2C+url_l%2C+owner_name%2C+views&format=json&nojsoncallback=1"
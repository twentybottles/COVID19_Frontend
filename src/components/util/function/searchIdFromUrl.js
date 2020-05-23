export default function searchIdFromUrl() {

  let urlParamStr = window.location.search;
  let params = {}

  if (urlParamStr) {

      urlParamStr = urlParamStr.substring(1)
      urlParamStr.split('&').forEach( param => {
          const temp = param.split('=')
          params = {
              ...params,
              [temp[0]]: temp[1]
          }
      })
  }

  return params.id;

}
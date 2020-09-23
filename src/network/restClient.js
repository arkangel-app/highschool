import axios from 'axios';



export default class RestClientObj {
  static instanceAxios = axios.create({
   baseURL: 'http://localhost:5000'
  });
  static setInterceptor =(callback) =>{
    RestClientObj.instanceAxios.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
        if(error.response.status === 403) {
          localStorage.removeItem('id_token');
          localStorage.removeItem('profile');

          callback();
          throw Error("Su sesión ha expirado");
        }else{
          console.log("inter");
          throw Error(error.response.data.message);
        };
    });
  }

  static setTokenToAxio = (token) => {
   RestClientObj.instanceAxios.defaults.headers.common['Authorization'] = token;
 }

 static cleartokenAxio = () => {
   RestClientObj.instanceAxios.defaults.headers.common['Authorization'] = undefined;
 }

 static getLastNews = () => {
   return RestClientObj.instanceAxios.get('/news/last_news',)
 }

 static getNewsList = (filtro) => {
   return RestClientObj.instanceAxios.post('/news/all_news',filtro)
 }

 static getPostById = (filtro) => {
   return RestClientObj.instanceAxios.post('/news/post_by_id',filtro)
}

static getClubes = () => {
  return RestClientObj.instanceAxios.get('/content/list_clubes',)
}

static getDocsPeriodismo = () => {
  return RestClientObj.instanceAxios.get('/content/documentos_periodismo',)
}
static getSearchFilter = (filtro) => {
  return RestClientObj.instanceAxios.post('/content/search',filtro)
}
static getContentById = (filtro) => {
  return RestClientObj.instanceAxios.post('/content/content_by_id',filtro)
}

static getVideos = (filtro) => {
  return RestClientObj.instanceAxios.post('/galleries/get_all_videos',filtro)
}

static getLastVideo = () => {
  return RestClientObj.instanceAxios.get('/galleries/last_video',)
}

static getVideoById = (filtro) => {
  return RestClientObj.instanceAxios.post('/content/get_video_by_id',filtro)
}

static getGalleries = (filtro) => {
    return RestClientObj.instanceAxios.post('/galleries/list_galleries',filtro)
}
static getSecondPhoto = (filtro) => {
  return RestClientObj.instanceAxios.post('/galleries/get_second_photo',filtro)
}

static galleryByPath = (filtro) => {
  return RestClientObj.instanceAxios.post('/galleries/gallery_by_path',filtro)
}

static getGaleriaContent = (filtro) => {
   return RestClientObj.instanceAxios.post('/galleries/getGallery',filtro)
 }

 static getTeam = () => {
    return RestClientObj.instanceAxios.get('/content/equipo',)
  }

  static getIdearioContent = () => {
     return RestClientObj.instanceAxios.get('/content/get_ideario',)
  }

  static getCapellania = () => {
      return RestClientObj.instanceAxios.get('/content/all_activities',)
  }

  static getSacerdotes = () => {
       return RestClientObj.instanceAxios.get('/content/horarios_sacerdotes',)
  }

  static sendTranscriptRequest = (data) => {
       return RestClientObj.instanceAxios.post('/users/transcript_request',data)
  }

  static getBoletines = () => {
      return RestClientObj.instanceAxios.get('/content/boletines',)
  }

  static getPopUpContent = () => {
      return RestClientObj.instanceAxios.get('/content/get_popup')
  }

  static getFotosBoletin = (data) => {
    return RestClientObj.instanceAxios.post('/content/get_boletin_fotos',data)
}
  static getArchivosPadres = ()=>{
    return RestClientObj.instanceAxios.get('/content/get_archivos_padres')
  }

}

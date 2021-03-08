const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const TokenService = {
    getToken() {
        const data = localStorage.getItem(TOKEN_KEY);
        if (!data) return ''
        else return data
    },
    getCsrf() {
        const data = localStorage.getItem('csrf');
        if (!data) return ''
        else return data
    },
    saveToken(accessToken: string) {
        localStorage.setItem(TOKEN_KEY, accessToken);
    },
    saveData( key: string , data: any){
      if (typeof data == 'object'){
        data = JSON.stringify(data)
      }
      localStorage.setItem(key, data)
    },
    getData( key: string ){
        const data = localStorage.getItem(key);
        if (!data) return ''
        else return data      
    },
    removeData( key: string ){
      localStorage.removeItem(key);
    },
    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },

    saveRefreshToken(refreshToken: string) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    },

    removeRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
};

export { TokenService };
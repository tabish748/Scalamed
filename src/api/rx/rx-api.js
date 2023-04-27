// api/userAPI.js

import BaseAPI from '../base-api.js';
import { XPI_KEY } from '../../libs/constants.js';

import { REQUEST_RX_DOWNLOAD_TOKEN } from '../data/endpoints/rx-endpoints.js';
class RxAPI extends BaseAPI {
  constructor() {
    super('/Rx');
  }

  async requestRxDownloadToken(data) {
    const url = `${this.baseUrl}${this.endpoint}${REQUEST_RX_DOWNLOAD_TOKEN}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': XPI_KEY,
        'Authorization':'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1c3IiLCJuYmYiOjAsInN1YiI6Ijc5MzFmMDBiLWQ5YjktNDRmMC1hZGMxLTM0YTBiZDJlNTIyOCIsInBybSI6IlBhdGllbnQiLCJleHBpcmVzSW4iOiIxeSIsImFnZW50RlFOIjoiY29tLnNjYWxhbWVkLnRlc3QuY2xvdWQiLCJ0aWQiOiIyMzZjYTc5MC02MGY1LTRiZDAtOWQ2MC1mMjAwODM5MTYxMDAiLCJqdGkiOiIyOTgxYTZjNi04MTdmLTQ2ZTctODdmYi04ZjAxNzNmNDkyZDMiLCJpc3MiOiJjb20uc2NhbGFtZWQuYXBwLXNlcnZpY2VzLmRldi5sb2NhbCIsImNoayI6IjE6OjdiZmM1M2VkYWQ2NTcxZTE1NTViYjQwYjc4YmY5MWVjMmFjYWRkMTViYTRkZGNjMzcyNzZkNzFkNWNiOGY5N2VkZjJhZTBkNGQwMzQzNmRjZTJiNTdlZTQ4MDc2NzcyOWE0YmU0NjdmOTE5YTI5NDUzMDk4NmIzZDhkZTg3YmI5YmEzZWIwNjhlYmE2MGMxODM4ZWNlZjMyMTU3ZmU5ZmQ4ZTgyZDZiNWIwNDQxODAzYWVkYWRiMzgyM2QwOWYzODViNjI2ZTJmMzYyMzllN2JhNzQ4OWFlYTljMDY1MmE4ODY3MjRjZjQ1NDBlYTg0OWVlNWM5N2FmYjY4ZTBmYjQiLCJpYXQiOjE2ODE4NzQ1OTYsImV4cCI6MTcxMzQzMjE5Nn0.QRrINKVU96UXvO8YBxHJEASq60Kd65mfgZ2ZzuV0Bie4K_YJxzEA9sPIAZju0tf9vOrjo_g5aHZEg1qKAbb0P6w3SztcKbI0gscSC4ZssZcmSx1dGz1kIjoyZjkHTHRp-5UIlvpAtWWJvUG5S4QW3wLE7rqwTbZKw3z_s4bgXE8',
      },
      
      body: JSON.stringify(data),
    };
    return this.fetchWrapper(url, options);
  }

}

export default new RxAPI();


import Axios from 'axios';

export class Lottery {
  getCustomersSmall() {
    return Axios.get('data/customers-small.json').then(res => res.data.data);
  }

  getCustomersMedium() {
    return Axios.get('data/customers-medium.json').then(res => res.data.data);
  }

  getCustomersLarge() {
    return Axios.get('data/customers-large.json').then(res => res.data.data);
  }

  getCustomersXLarge() {
    return Axios.get('data/customers-xlarge.json').then(res => res.data.data);
  }

  getLotteryResults() {
    return Axios.get('data/results.json').then(res => res.data.data);
  }
}

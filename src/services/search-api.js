import axios from 'axios';

export class ThemovieFetch {
  constructor() {
    this.base_url = `https://api.themoviedb.org/3`;
    this.api_key = `69178cbac05b13d057a60cacb1cf68a0`;
    this._searchQuery = '';
    this._page = 1;
    this.id = '';
    // this._perPage = 12;
  }

  get searchQuery() {
    return this._searchQuery;
  }

  set searchQuery(value) {
    return (this._searchQuery = value);
  }

  get page() {
    return this._page;
  }

  set page(value) {
    return (this._page += value);
  }

  resetPage() {
    return (this._page = 1);
  }

  async searchTrendMovie() {
    const url = `${this.base_url}/trending/all/day?api_key=${this.api_key}`;

    try {
      const result = await axios.get(url);
      const data = result.results;
      return data;
    } catch (error) {
      return error.message;
    }
  }

  async searchMovie() {
    const url = `${this.base_url}/search/movie?api_key=${this.api_key}&query=${this.searchQuery}&page=${this.page}`;

    try {
      const result = await axios.get(url);
      const data = result.results;
      return data;
    } catch (error) {
      return error.message;
    }
  }

  async searchDetalesMovie() {
    const url = `${this.base_url}/movie/${this.id}?api_key=${this.api_key}`;

    try {
      const result = await axios.get(url);
      const data = result.results;
      return data;
    } catch (error) {
      return error.message;
    }
  }

  async searchCreditsMovie() {
    const url = `${this.base_url}/movie/${this.id}/credits?api_key=${this.api_key}`;

    try {
      const result = await axios.get(url);
      const data = result.results;
      return data;
    } catch (error) {
      return error.message;
    }
  }

  async searchReviewsMovie() {
    const url = `${this.base_url}/movie/${this.id}/reviews?api_key=${this.api_key}`;

    try {
      const result = await axios.get(url);
      const data = result.results;
      return data;
    } catch (error) {
      return error.message;
    }
  }
}

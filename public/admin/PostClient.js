class PostClient {
  constructor(url) {
    this.url = url;
  }

  async getAll() {
    const response = await fetch(this.url);
    return await response.json();
  }

  async getById(id) {
    const response = await fetch(`${this.url}${id}`);
    return await response.json();
  }

  async post(record) {
    const response = await fetch(`${this.url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(record)
    });
  }

  async put(id, record) {
    const response = await fetch(`${this.url}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(record)
    });
  }

  async delete(id) {
    const response = await fetch(`${this.url}${id}`, {
      method: "DELETE"
    });
  }
}
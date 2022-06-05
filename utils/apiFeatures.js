class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    // $regex is the keyword in MongoDB
    // $options: "i": means case insenitive
    const keyword = this.queryStr.keyword
      ? { name: { $regex: this.queryStr.keyword, $options: "i" } }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    // Removing some field for category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((e) => delete queryCopy[e]);
    // Whenever you see this.query it means vastu.find()
    // queryCopy is itself an object so no need to write it in curly Brackets.

    // FILTER for Price and Rating
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (e) => `$${e}`);
    this.query = this.query.find(JSON.parse(queryStr));
    // this.query = this.query.find(queryCopy);

    return this;
  }

  // PAGINATION
  pagination(resultPerPage) {
    // In "this.queryStr" all the key-value pairs of the URL are present.
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}
module.exports = ApiFeatures;

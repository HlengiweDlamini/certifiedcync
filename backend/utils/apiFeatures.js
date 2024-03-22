
class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    //SEARCH METHOD
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i' //CASE INSENSITIVE
            }
        } : {}

        this.query =this.query.find({ ...keyword });
        return this;
    }
    filter() {
        const queryCopy = { ...this.queryStr };

        //REMOVE FIELDS FROM QUERY
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(e1 => delete queryCopy[e1]);

        this.query = this.query.find(queryCopy);
        return this;    

    }

    //PAGINATION
    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}
//EXPORT CLASS
module.exports = APIFeatures;
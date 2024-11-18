package grails.playground

class Book {
    String title
    String author
    Date publishedDate

    static constraints = {
        title nullable: false, blank: false
        author nullable: false, blank: false
        publishedDate nullable: true
    }
}

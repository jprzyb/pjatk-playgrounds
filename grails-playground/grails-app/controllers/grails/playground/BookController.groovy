package grails.playground

import grails.rest.*

@Resource(uri='/books', readOnly = false, formats = ['json', 'xml'])
class BookController {
    static responseFormats = ['json', 'xml']
}

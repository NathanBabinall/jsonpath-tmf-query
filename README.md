# JSONPath TMF Query

This library aims to provide a simple wrapper around jsonpath, to ease the implementation of TMF630 JSONPath specification as outlined by the TM Forum [here](https://projects.tmforum.org/wiki/pages/viewpage.action?spaceKey=PUB&title=TMF630+REST+API+Design+Guidelines+v4.0.1)

## Usage

### `JSONPathQuery.query(document: any, query: Operation[]): any`

Accepts a document and an array of query operations to be performed on the document. These operations all take a JSONPath query in the path parameter as outlined [here](https://goessner.net/articles/JsonPath/index.html#e2), and have been identified in the TMF630 specification guidelines [Part 6](https://projects.tmforum.org/wiki/download/attachments/134785806/TMF630_REST_API_Design_Guidelines_Part_6_v4.0.1.docx?api=v2). These Operations are outlined below:
  1. Sort
  2. Filter
  3. Fields

Returns a mutated document or collection.

***Note: these operations occur in the above mentioned order when combined***

### Operations
#### **Sort** `{ path: string, op: 'sort', order: 'asc' | 'desc'}`

#### **Filter** `{ path: string, op: 'filter', limit?: number, offset?: number}`
As filter allows for limit and offset, keep in mind that JSONPath also allows for similar functionality with array slices [x:y]. Combining both will likely return unintended results.

#### **Fields** `{ path: string, op: 'fields'}`
When Fields is used, the id and href will always be returned. If fields is used on a collection, then the id and href must be included for all elements in the response.


### Examples
For working examples of JSON Path Querying, look at the [`src/test/unit.test.ts`]() file from the source repository. These test cases are taken from [Part 6](https://projects.tmforum.org/wiki/download/attachments/134785806/TMF630_REST_API_Design_Guidelines_Part_6_v4.0.1.docx?api=v2) of the TMF 630 specification.

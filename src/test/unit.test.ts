import { suite, test } from 'mocha';
import { expect } from 'chai';
import JSONPathQuery, { Operation, checkValidJsonPath } from '../JSONPathQuery';
import { simpleDocument, arrayDocument } from './fixture';

suite('TM Forum Examples - Fields', () => {
  test('Return channel name + root id and href', () => {
    const query: Operation[] = [
      {
        op: 'fields',
        path: 'channel.name',
      },
    ];
    const expected = {
      id: '3180',
      href: 'https://host:port/troubleTicket/v2/troubleTicket/3180',
      channel: {
        name: 'Self Service',
      },
    };
    const result = JSONPathQuery.query(simpleDocument, query);
    expect(result).to.eql(expected);
  });

  test('Return channel name + root id and href, for all elements in collection', () => {
    const query: Operation[] = [
      {
        op: 'fields',
        path: '[*].channel.name',
      },
    ];
    const expected = [
      {
        id: '3180',
        href: 'https://host:port/troubleTicket/v2/troubleTicket/3180',
        channel: {
          name: 'Self Service',
        },
      },
      {
        id: '6000',
        href: 'https://host:port/troubleTicket/v2/troubleTicket/6000',
        channel: {
          name: 'Self Service',
        },
      },
    ];
    const result = JSONPathQuery.query(arrayDocument, query);
    expect(result).to.eql(expected);
  });

  test('Return note where author=="Mr John Wils" + root id and href', () => {
    const query: Operation[] = [
      {
        op: 'fields',
        path: "note[?(@.author=='Mr John Wils')]",
      },
    ];
    const expected = {
      id: '3180',
      href: 'https://host:port/troubleTicket/v2/troubleTicket/3180',
      note: [
        {
          id: '1',
          date: '2018-05-01T00:00',
          author: 'Mr John Wils',
          text: 'Missing necessary information from the customer',
        },
      ],
    };
    const result = JSONPathQuery.query(simpleDocument, query);
    expect(result).to.eql(expected);
  });

  test('Return notes for each object where note author=="Mr Redfin Tekram" + root id and href', () => {
    const query: Operation[] = [
      {
        op: 'fields',
        path: "[*].note[?(@.author=='Mr Redfin Tekram')]",
      },
    ];
    const expected = [
      {
        id: '3180',
        href: 'https://host:port/troubleTicket/v2/troubleTicket/3180',
        note: [
          {
            id: '3',
            date: '2018-05-02T00:00',
            author: 'Mr Redfin Tekram',
            text: 'Issue has been resolved, the service has been restored',
          },
        ],
      },
      {
        id: '6000',
        href: 'https://host:port/troubleTicket/v2/troubleTicket/6000',
        note: [
          {
            id: '3',
            date: '2018-05-02T00:00',
            author: 'Mr Redfin Tekram',
            text: 'Issue has been resolved, the service has been restored',
          },
          {
            id: '4',
            date: '2018-05-02T00:00',
            author: 'Mr Redfin Tekram',
            text: 'Issue has been resolved, the service has been restored',
          },
        ],
      },
    ];
    const result = JSONPathQuery.query(arrayDocument, query);
    expect(result).to.eql(expected);
  });

  test('Return id, href, name, and notes', () => {
    const query: Operation[] = [
      {
        op: 'fields',
        path: 'id,href,name,note',
      },
    ];
    const expected = {
      id: '3180',
      href: 'https://host:port/troubleTicket/v2/troubleTicket/3180',
      name: 'Compliant over last bill',
      note: [
        {
          id: '1',
          date: '2018-05-01T00:00',
          author: 'Mr John Wils',
          text: 'Missing necessary information from the customer',
        },
        {
          id: '2',
          date: '2018-05-01T00:00',
          author: 'Mr Erika Xavy',
          text: "Information has been received, we're working on the resolution",
        },
        {
          id: '3',
          date: '2018-05-02T00:00',
          author: 'Mr Redfin Tekram',
          text: 'Issue has been resolved, the service has been restored',
        },
        {
          id: '4',
          date: '2018-05-02T00:00',
          author: 'Mr Redfin Tekram',
          text: 'Issue has been resolved, the service has been restored',
        },
        {
          id: '5',
          date: '2018-05-01T00:00',
          author: 'Mr Erika Xavy',
          text: "Information has been received, we're working on the resolution",
        },
      ],
    };
    const result = JSONPathQuery.query(simpleDocument, query);
    expect(result).to.eql(expected);
  });

  test('Return id, href, name, status for each object in collection', () => {
    const query: Operation[] = [
      {
        op: 'fields',
        path: '[*][name,status]',
      },
    ];
    const expected = [
      {
        id: '3180',
        href: 'https://host:port/troubleTicket/v2/troubleTicket/3180',
        name: 'Compliant over last bill',
        status: 'Resolved',
      },
      {
        id: '6000',
        href: 'https://host:port/troubleTicket/v2/troubleTicket/6000',
        name: 'Compliant over last bill',
        status: 'Resolved',
      },
    ];
    const result = JSONPathQuery.query(arrayDocument, query);
    expect(result).to.eql(expected);
  });

  test('Return id, href, name, and notes of all objects in collection', () => {
    const query: Operation[] = [
      {
        op: 'fields',
        path: '[*].relatedEntity[*][id,name,`@referredType]',
      },
    ];
    const expected = [
      {
        id: '3180',
        href: 'https://host:port/troubleTicket/v2/troubleTicket/3180',
        relatedEntity: [
          {
            id: '3472',
            name: 'November Bill',
            '@referredType': 'CustomerBill',
          },
          {
            id: '3473',
            name: 'December Bill',
            '@referredType': 'CustomerBill',
          },
        ],
      },
      {
        id: '6000',
        href: 'https://host:port/troubleTicket/v2/troubleTicket/6000',
        relatedEntity: [
          {
            id: '3474',
            name: 'November Bill',
            '@referredType': 'CustomerBill',
          },
          {
            id: '3475',
            name: 'December Bill',
            '@referredType': 'CustomerBill',
          },
        ],
      },
    ];
    const result = JSONPathQuery.query(arrayDocument, query);
    expect(result).to.eql(expected);
  });

  test('return id and href of single root object when field path is none', () => {
    const query: Operation[] = [
      {
        op: 'fields',
        path: 'doesNotExist',
      },
    ];
    const expected = {
      id: '3180',
      href: 'https://host:port/troubleTicket/v2/troubleTicket/3180',
    };
    const result = JSONPathQuery.query(simpleDocument, query);
    expect(result).to.eql(expected);
  });

  test('return id and href of all root objects when fields = none', () => {
    const query: Operation[] = [
      {
        op: 'fields',
        path: 'none',
      },
    ];
    const expected = [
      {
        id: '3180',
        href: 'https://host:port/troubleTicket/v2/troubleTicket/3180',
      },
      {
        id: '6000',
        href: 'https://host:port/troubleTicket/v2/troubleTicket/6000',
      },
    ];
    const result = JSONPathQuery.query(arrayDocument, query);
    expect(result).to.eql(expected);
  });

  test('return id and href of root object when field path does not exist', () => {
    const query: Operation[] = [
      {
        op: 'fields',
        path: 'doesNotExist',
      },
    ];
    const expected = {
      id: '3180',
      href: 'https://host:port/troubleTicket/v2/troubleTicket/3180',
    };
    const result = JSONPathQuery.query(simpleDocument, query);
    expect(result).to.eql(expected);
  });

  test('Array multiple index selection', () => {
    const query: Operation[] = [
      {
        op: 'fields',
        path: 'note[0,2,4,5]',
      },
    ];
    const expected = {
      id: '3180',
      href: 'https://host:port/troubleTicket/v2/troubleTicket/3180',
      note: [
        {
          id: '1',
          date: '2018-05-01T00:00',
          author: 'Mr John Wils',
          text: 'Missing necessary information from the customer',
        },
        {
          id: '3',
          date: '2018-05-02T00:00',
          author: 'Mr Redfin Tekram',
          text: 'Issue has been resolved, the service has been restored',
        },
        {
          id: '5',
          date: '2018-05-01T00:00',
          author: 'Mr Erika Xavy',
          text: "Information has been received, we're working on the resolution",
        },
      ],
    };
    const result = JSONPathQuery.query(simpleDocument, query);
    expect(result).to.eql(expected);
  });

  test('multiple field evaluations', () => {
    const query: Operation[] = [
      {
        op: 'fields',
        path: 'note[?(@.id<4&&@.author=="Mr Redfin Tekram")]',
      },
    ];
    const expected = {
      id: '3180',
      href: 'https://host:port/troubleTicket/v2/troubleTicket/3180',
      note: [
        {
          id: '3',
          date: '2018-05-02T00:00',
          author: 'Mr Redfin Tekram',
          text: 'Issue has been resolved, the service has been restored',
        },
      ],
    };
    const result = JSONPathQuery.query(simpleDocument, query);
    expect(result).to.eql(expected);
  });

  test('multiple field evaluations', () => {
    const query: Operation[] = [
      {
        op: 'fields',
        path: '..note[?(@.id>3&& @.author=="Mr Redfin Tekram")]^^',
      },
    ];
    const expected = [
      {
        id: '3180',
        href: 'https://host:port/troubleTicket/v2/troubleTicket/3180',
      },
      arrayDocument[1],
    ];
    const result = JSONPathQuery.query(arrayDocument, query);
    expect(result).to.eql(expected);
  });
});

suite('TM Forum Examples - Filter', () => {
  test('Filter statusChange array based on string match', () => {
    const query: Operation[] = [
      {
        op: 'filter',
        path: "statusChange[?(@.status=='Pending')]",
      },
    ];
    const expected = [
      {
        status: 'Pending',
        changeReason: 'Need more information from the customer',
        changeDate: '2018-05-01T00:00',
      },
    ];
    const result = JSONPathQuery.query(simpleDocument, query);
    expect(result).to.eql(expected);
  });

  test('Filter attachments for size equal to 300', () => {
    const query: Operation[] = [
      {
        op: 'filter',
        path: 'attachment[?(@.size==300)]',
      },
    ];
    const expected = [
      {
        description: 'Scanned disputed December bill',
        href: 'http://hostname:port/documentManagement/v2/attachment/44',
        id: '44',
        url: 'http://xxxxx',
        name: 'December Bill',
        size: 300,
        sizeUnit: 'KB',
        '@referredType': 'Attachment',
      },
    ];
    const result = JSONPathQuery.query(simpleDocument, query);
    expect(result).to.eql(expected);
  });

  test('Filter status change where status is equal to "Pending"', () => {
    const query: Operation[] = [
      {
        op: 'filter',
        path: "statusChange[?(@.status!='Pending')]",
      },
    ];
    const expected = [
      {
        status: 'InProgress',
        changeReason: 'Working on the issue resolution',
        changeDate: '2018-05-02T00:00',
      },
      {
        status: 'Resolved',
        changeReason: 'Issue has been resolved',
        changeDate: '2018-05-02T00:00',
      },
    ];
    const result = JSONPathQuery.query(simpleDocument, query);
    expect(result).to.eql(expected);
  });

  test('Filter attachments where no size is returned, should return empty', () => {
    const query: Operation[] = [
      {
        op: 'filter',
        path: 'attachment[?(!@.size)]',
      },
    ];
    const expected: [] = [];
    const result = JSONPathQuery.query(simpleDocument, query);
    expect(result).to.eql(expected);
  });

  test('Filter by attachment size and unit', () => {
    const query: Operation[] = [
      {
        op: 'filter',
        path: "attachment[?(@.size==300 && @.sizeUnit=='KB')]",
      },
    ];
    const expected = [
      {
        description: 'Scanned disputed December bill',
        href: 'http://hostname:port/documentManagement/v2/attachment/44',
        id: '44',
        url: 'http://xxxxx',
        name: 'December Bill',
        size: 300,
        sizeUnit: 'KB',
        '@referredType': 'Attachment',
      },
    ];
    const result = JSONPathQuery.query(simpleDocument, query);
    expect(result).to.eql(expected);
  });

  test('Filter notes - includes offset + limit', () => {
    const query: Operation[] = [
      {
        op: 'filter',
        path: 'note[?(@.id>=2)]',
        limit: 2,
        offset: 1,
      },
    ];
    const expected = [
      {
        id: '3',
        date: '2018-05-02T00:00',
        author: 'Mr Redfin Tekram',
        text: 'Issue has been resolved, the service has been restored',
      },
      {
        id: '4',
        date: '2018-05-02T00:00',
        author: 'Mr Redfin Tekram',
        text: 'Issue has been resolved, the service has been restored',
      },
    ];
    const result = JSONPathQuery.query(simpleDocument, query);
    expect(result).to.eql(expected);
  });

  test('Filter notes - use a nested filter expression to get the troubleTicket with a specific relatedEntity', () => {
    const query: Operation[] = [
      {
        op: 'filter',
        path: '$[?(@.relatedEntity[?(@.id==3474)])]',
      },
    ];
    const expected = [
      arrayDocument[1],
    ];
    const result = JSONPathQuery.query(arrayDocument, query);
    expect(result).to.eql(expected);
  });

  test('Filter notes - includes limit', () => {
    const query: Operation[] = [
      {
        op: 'filter',
        path: 'note[?(@.id>=2)]',
        limit: 1,
      },
    ];
    const expected = [
      {
        id: '2',
        date: '2018-05-01T00:00',
        author: 'Mr Erika Xavy',
        text: "Information has been received, we're working on the resolution",
      },
    ];
    const result = JSONPathQuery.query(simpleDocument, query);
    expect(result).to.eql(expected);
  });

  test('Filter notes - includes offset', () => {
    const query: Operation[] = [
      {
        op: 'filter',
        path: 'note[?(@.id>=2)]',
        offset: 3,
      },
    ];
    const expected = [
      {
        id: '5',
        date: '2018-05-01T00:00',
        author: 'Mr Erika Xavy',
        text: "Information has been received, we're working on the resolution",
      },
    ];
    const result = JSONPathQuery.query(simpleDocument, query);
    expect(result).to.eql(expected);
  });
});

suite('TM Forum Examples - Sort', () => {
  test('Sort and return notes id in ascending order- should not change', () => {
    const query: Operation[] = [
      {
        op: 'sort',
        path: 'note[*].id',
        order: 'asc',
      },
    ];
    const expected = simpleDocument;
    const result = JSONPathQuery.query(simpleDocument, query);
    expect(result).to.eql(expected);
  });

  test('Sort and return notes in descending order - notes will reverse', () => {
    const query: Operation[] = [
      {
        op: 'sort',
        path: 'note[*].id',
        order: 'desc',
      },
    ];
    const reversedNotes = [...simpleDocument.note].reverse();
    const expected = { ...simpleDocument, note: reversedNotes.slice() };
    const result = JSONPathQuery.query(simpleDocument, query);

    expect(result).to.eql(expected);
  });

  test('Sort and return collection based on id in ascending order - no change', () => {
    const query: Operation[] = [
      {
        op: 'sort',
        path: '[*].id',
        order: 'asc',
      },
    ];
    const expected = arrayDocument;
    const result = JSONPathQuery.query(arrayDocument, query);
    expect(result).to.eql(expected);
  });

  test('Sort and return collection based on id in descending order - collection will reverse', () => {
    const query: Operation[] = [
      {
        op: 'sort',
        path: '[*].id',
        order: 'desc',
      },
    ];
    const expected = [...arrayDocument].reverse();
    const result = JSONPathQuery.query(arrayDocument, query);

    expect(result).to.eql(expected);
  });
});

suite('TM Forum Examples - Filter + Fields + Sort', () => {
  test('Sort Notes by author in ascending order, filter notes with id >= 3, return fields: id, text, author', () => {
    const query: Operation[] = [
      {
        op: 'filter',
        path: 'note[?(@.id>=3)]',
      },
      {
        op: 'fields',
        path: '[*][id,text,author]',
      },
      {
        op: 'sort',
        path: 'note[*].author',
        order: 'asc',
      },
    ];
    const expected = [
      {
        id: '5',
        author: 'Mr Erika Xavy',
        text: "Information has been received, we're working on the resolution",
      },
      {
        id: '3',
        author: 'Mr Redfin Tekram',
        text: 'Issue has been resolved, the service has been restored',
      },
      {
        id: '4',
        author: 'Mr Redfin Tekram',
        text: 'Issue has been resolved, the service has been restored',
      },
    ];
    const result = JSONPathQuery.query(simpleDocument, query);
    expect(result).to.eql(expected);
  });

  test('Sort Notes by author in descending order, filter notes with id <= 4, return fields: id, text WITHOUT AUTHOR', () => {
    const query: Operation[] = [
      {
        op: 'filter',
        path: 'note[?(@.id<=4)]',
      },
      {
        op: 'fields',
        path: '[*][id,text]',
      },
      {
        op: 'sort',
        path: 'note[*].author',
        order: 'desc',
      },
    ];
    const expected = [
      {
        id: '3',
        text: 'Issue has been resolved, the service has been restored',
      },
      {
        id: '4',
        text: 'Issue has been resolved, the service has been restored',
      },
      {
        id: '1',
        text: 'Missing necessary information from the customer',
      },
      {
        id: '2',
        text: "Information has been received, we're working on the resolution",
      },
    ];
    const result = JSONPathQuery.query(simpleDocument, query);
    expect(result).to.eql(expected);
  });
});

suite('Test jsonpath expression validation', () => {
  test('jsonpath string validity - note[?(@.id<=4)]', () => {
    const jsonpathExpression = 'note[?(@.id<=4)]';
    const valid = checkValidJsonPath(jsonpathExpression);
    expect(valid).to.eql(true);
  });

  test("jsonpath string validity - $[*]['id','text']", () => {
    const jsonpathExpression = "$[*]['id','text']";
    const valid = checkValidJsonPath(jsonpathExpression);
    expect(valid).to.eql(true);
  });

  test('jsonpath string validity - note[*].author', () => {
    const jsonpathExpression = 'note[*].author';
    const valid = checkValidJsonPath(jsonpathExpression);
    expect(valid).to.eql(true);
  });

  test('jsonpath string validity - [*].id', () => {
    const jsonpathExpression = '[*].id';
    const valid = checkValidJsonPath(jsonpathExpression);
    expect(valid).to.eql(true);
  });

  test('jsonpath string validity - attachment[?(!@.size)]', () => {
    const jsonpathExpression = 'attachment[?(!@.size)]';
    const valid = checkValidJsonPath(jsonpathExpression);
    expect(valid).to.eql(true);
  });

  test('jsonpath string validity - channel.name', () => {
    const jsonpathExpression = 'channel.name';
    const valid = checkValidJsonPath(jsonpathExpression);
    expect(valid).to.eql(true);
  });

  test('jsonpath string validity - id,href (e.g fields query)', () => {
    const jsonpathExpression = 'id,href';
    const valid = checkValidJsonPath(jsonpathExpression);
    expect(valid).to.eql(true);
  });
});

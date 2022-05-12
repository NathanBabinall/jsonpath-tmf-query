/* eslint-disable import/prefer-default-export */
export const arrayDocument = [
  {
    id: '3180',
    href: 'https://host:port/troubleTicket/v2/troubleTicket/3180',
    name: 'Compliant over last bill',
    status: 'Resolved',
    relatedEntity: [
      {
        id: '3472',
        href: 'https://host:port/customerBillManagement/v2/customerBill/3472',
        name: 'November Bill',
        '@referredType': 'CustomerBill',
      },
      {
        id: '3473',
        href: 'https://host:port/customerBillManagement/v2/customerBill/3473',
        name: 'December Bill',
        '@referredType': 'CustomerBill',
      },
    ],
    statusChange: [
      {
        status: 'Pending',
        changeReason: 'Need more information from the customer',
        changeDate: '2018-05-01T00:00',
      },
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
    ],
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
    ],
    attachment: [
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
      {
        description: 'Scanned disputed November bill',
        href: 'http://hostname:port/documentManagement/v2/attachment/45',
        id: '45',
        url: 'http://xxxxx',
        name: 'November Bill ',
        size: 500,
        sizeUnit: 'KB',
        '@referredType': 'Attachment',
      },
    ],
    channel: {
      id: '8774',
      name: 'Self Service',
      '@type': 'Channel',
    },
  },
  {
    id: '6000',
    href: 'https://host:port/troubleTicket/v2/troubleTicket/6000',
    name: 'Compliant over last bill',
    status: 'Resolved',
    relatedEntity: [
      {
        id: '3474',
        href: 'https://host:port/customerBillManagement/v2/customerBill/3472',
        name: 'November Bill',
        '@referredType': 'CustomerBill',
      },
      {
        id: '3475',
        href: 'https://host:port/customerBillManagement/v2/customerBill/3473',
        name: 'December Bill',
        '@referredType': 'CustomerBill',
      },
    ],
    statusChange: [
      {
        status: 'Pending',
        changeReason: 'Need more information from the customer',
        changeDate: '2018-05-01T00:00',
      },
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
    ],
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
    attachment: [
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
      {
        description: 'Scanned disputed November bill',
        href: 'http://hostname:port/documentManagement/v2/attachment/45',
        id: '45',
        url: 'http://xxxxx',
        name: 'November Bill ',
        size: 500,
        sizeUnit: 'KB',
        '@referredType': 'Attachment',
      },
    ],
    channel: {
      id: '8774',
      name: 'Self Service',
      '@type': 'Channel',
    },
  },
];

export const simpleDocument = {
  id: '3180',
  href: 'https://host:port/troubleTicket/v2/troubleTicket/3180',
  name: 'Compliant over last bill',
  status: 'Resolved',
  relatedEntity: [
    {
      id: '3472',
      href: 'https://host:port/customerBillManagement/v2/customerBill/3472',
      name: 'November Bill',
      '@referredType': 'CustomerBill',
    },
    {
      id: '3473',
      href: 'https://host:port/customerBillManagement/v2/customerBill/3473',
      name: 'December Bill',
      '@referredType': 'CustomerBill',
    },
  ],
  statusChange: [
    {
      status: 'Pending',
      changeReason: 'Need more information from the customer',
      changeDate: '2018-05-01T00:00',
    },
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
  ],
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
  attachment: [
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
    {
      description: 'Scanned disputed November bill',
      href: 'http://hostname:port/documentManagement/v2/attachment/45',
      id: '45',
      url: 'http://xxxxx',
      name: 'November Bill ',
      size: 500,
      sizeUnit: 'KB',
      '@referredType': 'Attachment',
    },
  ],
  channel: {
    id: '8774',
    name: 'Self Service',
    '@type': 'Channel',
  },
};

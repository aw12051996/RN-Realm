export default class CarSchema {
  static schema = {
    name: 'Car',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      make: 'string',
      model: 'string',
      createdDate: 'date',
      updatedDate: 'date',
    },
  };
}

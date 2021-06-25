import getRealm from './../../utils/realm';

export async function getAll() {
  const realm = await getRealm();
  const data = realm.objects('Car');
  return data;
}

export async function save(params) {
  const realm = await getRealm();
  // create id
  const id =
    realm.objects('Car').sorted('id', true).length > 0
      ? realm.objects('Car').sorted('id', true)[0].id + 1
      : 1;

  const data = {
    id: id,
    make: params.make,
    model: params.model,
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  realm.write(() => {
    realm.create('Car', data);
  });
}

export async function edit(params, array) {
  const realm = await getRealm();

  realm.write(() => {
    realm.create('Car', params, 'modified');
  });

  const result = array.map(item => (item.id === params.id ? params : item));

  return result;
}

export async function deleted(params) {
  const realm = await getRealm();
  const ID = params.id;
  realm.write(() => {
    if (realm.objects('Car').filtered('id =' + ID).length > 0) {
      realm.delete(realm.objects('Car').filtered('id =' + ID));
    }
  });

  const result = realm.objects('Car');

  return result;
}

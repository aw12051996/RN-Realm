import Realm from 'realm';
// schemas
import CarSchema from '../database/models/CarSchema';

export default function getRealm() {
  return Realm.open({
    schema: [CarSchema],
    schemaVersion: 1,
  });
}

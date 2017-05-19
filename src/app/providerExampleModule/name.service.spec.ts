import {NameService} from '.';

describe('nameService', () => {
  it('works', () => {
    let name = 'this is a name';
    let target = new NameService(name);

    let result = target.getName();

    expect(result).toEqual(name);
  });
});

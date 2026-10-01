import { filterOptions } from './filter-options';

describe('filterOptions', () => {
  const names = ['Aaron Smith', 'adam Jones', 'Bob Aaronson', 'Abby Lee'];

  it('returns nothing for blank input', () => {
    expect(filterOptions(names, '')).toEqual([]);
    expect(filterOptions(names, '   ')).toEqual([]);
  });

  it('matches case-insensitive prefixes only', () => {
    expect(filterOptions(names, 'aa')).toEqual(['Aaron Smith']);
    expect(filterOptions(names, ' A ')).toEqual(['Aaron Smith', 'adam Jones', 'Abby Lee']);
  });

  it('stops at the limit', () => {
    expect(filterOptions(names, 'a', 2)).toEqual(['Aaron Smith', 'adam Jones']);
  });
});

const assert = require('assert');
const { search } = require('../index');

describe('node-ecdict', () => { 
  describe('search word', () => {
    it('should search word normally', () => {
      search('test')
        .then(result => {
          assert(result.length === 1);
        })
    });
  });

  describe('trim keyword', () => {
    it('should trim keyword', () => {
      const search1 = search('keyword');
      const search2 = search(' keyword   ');
      Promise.all([search1, search2])
        .then(values => {
          const res1 = values[0][0];
          const res2 = values[1][0];
          assert(res1.id && res2.id && res1.id === res2.id);
        })
    })
  })

  describe('search nothing', () => { 
    it('search nothing normally', () => {
      search('')
        .then(result => {
          assert(result.length === 0);
        })
    });
  })
})

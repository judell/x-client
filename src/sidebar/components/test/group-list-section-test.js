'use strict';

const angular = require('angular');
const groupListSection = require('../group-list-section');
const util = require('../../directive/test/util');

describe('groupListSection', () => {
  before(() => {
    angular.module('app', []).component('groupListSection', groupListSection);
  });

  beforeEach(() => {
    angular.mock.module('app', {});
  });

  const createGroupListSection = fakeSectionGroups => {
    return util.createDirective(document, 'groupListSection', {
      sectionGroups: fakeSectionGroups,
    });
  };

  describe('isSelectable', () => {
    [
      {
        description:
          'returns false if group is out of scope and scope is enforced',
        scopesEnforced: true,
        expectedIsSelectable: [true, false],
      },
      {
        description:
          'returns true if group is out of scope but scope is not enforced',
        scopesEnforced: false,
        expectedIsSelectable: [true, true],
      },
    ].forEach(({ description, scopesEnforced, expectedIsSelectable }) => {
      it(description, () => {
        const fakeSectionGroups = [
          {
            isScopedToUri: true,
            scopes: { enforced: scopesEnforced },
            id: 0,
          },
          {
            isScopedToUri: false,
            scopes: { enforced: scopesEnforced },
            id: 1,
          },
        ];

        const element = createGroupListSection(fakeSectionGroups);

        fakeSectionGroups.forEach(g =>
          assert.equal(
            element.ctrl.isSelectable(g.id),
            expectedIsSelectable[g.id]
          )
        );
      });
    });
  });
});
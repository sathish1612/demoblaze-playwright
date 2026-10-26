import {test as base, expect} from '@playwright/test';
import users from '../test-data/users.json';

type AuthFixture = {
    testData: {username: string, password: string}
}

const test = base.extend<AuthFixture>({
    testData: async ({}, use) => {
        const data = {username: users.username, password: users.password};
        await use(data);
    }
});

export {test, expect};

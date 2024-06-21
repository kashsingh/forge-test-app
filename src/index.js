import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

resolver.define('getIssues', async ({ payload }) => {
    const params = new URLSearchParams(payload.params || {});
    return await getIssues(params);
});
const getIssues = async (params) => {
    const requestURL = route`/rest/api/3/issue/picker?${params}`;

    const reqHeaders = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
    
    try {
        const res = await api.asUser().requestJira(requestURL, reqHeaders);
        const data = await res.text();
        const status = res.status;
        // console.log(status);
        return { status, data };
    } catch (error) {
        console.error('Error occurred while fetching data.', error);
        return [];
    }
}

export const handler = resolver.getDefinitions();


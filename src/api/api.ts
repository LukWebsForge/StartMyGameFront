class SMGApi {

    public async requestStart(): Promise<string> {
        const data = await this.request<{
            status: string;
        }>('POST', 'start');
        return data.status;
    }

    public fetchStatus(): Promise<StatusResponse> {
        return this.request<StatusResponse>('GET', 'status');
    }

    private async request<T>(method: string, endpoint: string): Promise<T> {
        const response = await fetch(this.getBaseUrl() + '/' + endpoint + '/', {method});
        if (!response.ok) {
            throw new Error(response.status + ': ' + response.statusText);
        }
        const data = await response.json();
        return data as T;
    }

    private getBaseUrl(): string {
        if (process.env.NODE_ENV === 'production') {
            return process.env.BASE_URL + 'api';
        } else {
            return 'http://localhost:8011';
        }
    }
}

interface StatusResponse {
    status: string;
    progress: number;
    progress_max: number;
    name: string;
    ip: string;
    online_player: number;
    last_online: string;
}

export { SMGApi, StatusResponse };

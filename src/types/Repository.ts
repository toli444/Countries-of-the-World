export interface Repository {
    name: string,
    owner: string,
    languages: string[]
}

export interface RepositoriesData {
    repositories: Repository[]
}

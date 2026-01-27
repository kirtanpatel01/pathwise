import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

export interface GithubStats {
  username: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  languages: Record<string, number>;
  top_repos: {
    name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
  }[];
}

export async function fetchGithubStats(username: string): Promise<GithubStats> {
  const { data: user } = await octokit.rest.users.getByUsername({
    username,
  });

  const { data: repos } = await octokit.rest.repos.listForUser({
    username,
    sort: "pushed",
    per_page: 10,
    type: "owner",
  });

  const languages: Record<string, number> = {};

  // Aggregate languages (simple count for now, improves speed vs fetching lang stats per repo)
  repos.forEach((repo) => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  const top_repos = repos
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 5)
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language || null,
      stargazers_count: repo.stargazers_count || 0,
    }));

  return {
    username: user.login,
    bio: user.bio,
    public_repos: user.public_repos,
    followers: user.followers,
    languages,
    top_repos,
  };
}

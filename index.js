/*
 * Package Import
 */
import { Octokit } from "@octokit/core";
import { Low, JSONFile } from "lowdb";
import path from "path";
import fs from "fs";

/*
 * Local Import
 */
import PULL_REQUEST_STATE from "./constants.js";

/*
 * Init
 */
const octokit = new Octokit({
  auth: "",
});

// Use JSON file for storage
const appDirectory = fs.realpathSync(process.cwd());
const file = path.join(appDirectory, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Read data from JSON file, this will set db.data content
await db.read();

// Set default data
db.data ||= { repositories: [] };

// https://docs.github.com/en/rest/reference/pulls#list-reviews-for-a-pull-request
// [GET] /repos/{owner}/{repo}/pulls/{pull_number}/reviews
const getPullRequest = async ({ owner, repo, number }) => {
  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews",
    {
      owner,
      repo,
      pull_number: number,
    }
  );

  if (
    !data.some(
      (pullRequest) =>
        pullRequest.state === PULL_REQUEST_STATE.APPROVED ||
        pullRequest.state === PULL_REQUEST_STATE.DENIED
    )
  ) {
    return {
      owner,
      repo,
      number,
      state: PULL_REQUEST_STATE.REVIEW,
    };
  }
};

// https://docs.github.com/en/rest/reference/pulls#list-pull-requests
// [GET] /repos/{owner}/{repo}/pulls
const getPullRequests = async ({ owner, repo }) => {
  const { data } = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
    owner,
    repo,
    state: "open",
  });

  //
  const pullRequests = data
    .filter((pullRequest) => !pullRequest.draft)
    .map(({ number }) => getPullRequest({ owner, repo, number }));

  //
  const pullRequestsReview = await Promise.all(pullRequests);
  console.log({ pullRequestsReview });
};

// const setRepostitory = (repository) => {
//   db.data.repositories.push('***');
//   db.write();
// }

/*
 * Init
 */
for (const repository of db.data.repositories) {
  const [owner, repo] = repository.split("/");

  if (owner && repo) {
    getPullRequests({ owner, repo });
  }
}

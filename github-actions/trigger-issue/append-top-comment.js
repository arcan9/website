const {Octokit} = require('@octokit/rest');

var github
var context
// TEST COMMENT 
/**
 * @description
 * @param {Object} g github object
 * @param {Object} c context object
 */
async function main({g, c}) {
	github = g
	context = c

	const octokit = new Octokit({ auth: process.env.REPO_TOKEN })
	const issueNum = context.payload.issue.number
	const wikiLink =
		"https://github.com/hackforla/website/wiki/How-to-work-off-of-a-feature-branch";

	try {
		await octokit.request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
			owner: context.repo.owner,
			repo: context.repo.repo,
			issue_number: issueNum,
			title: "Instructions for Feature Branch",
			body: `This issue involves working off of a feature branch. 
			
			Check out this [wiki](${wikiLink}) and follow the outlined steps.
			
			Note: Do not manually remove this instruction at the bottom.`,
			state: "open",
			headers: {
				"X-GitHub-Api-Version": "2022-11-28"
			}
		})
	}
	catch(err) {
		throw new Error(err);
	}
}

module.exports =  main;

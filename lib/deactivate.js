"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function deactivateEnvironment(client, repo, environment) {
    return __awaiter(this, void 0, void 0, function* () {
        const deployments = yield client.repos.listDeployments({
            repo: repo.repo,
            owner: repo.owner,
            environment,
        });
        const existing = deployments.data.length;
        if (existing < 1) {
            console.log(`found no existing deployments for env ${environment}`);
            return;
        }
        const deadState = 'inactive';
        console.log(`found ${existing} existing deployments for env ${environment} - marking as ${deadState}`);
        for (let i = 0; i < existing; i++) {
            const deployment = deployments.data[i];
            console.log(`setting deployment '${environment}.${deployment.id}' (${deployment.sha}) state to "${deadState}"`);
            yield client.repos.createDeploymentStatus(Object.assign({}, repo, { deployment_id: deployment.id, state: deadState }));
        }
        console.log(`${existing} deployments updated`);
    });
}
exports.default = deactivateEnvironment;

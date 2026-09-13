# Practice Map and Practice Log retirement

Deployment approved by John on 13 September 2026.

The live D1 export was privately restored into SQLite and passed integrity checking; all 12 application table counts matched the live database. The SHA-256 checksum is `9ca7a72ca381cf61ed327464332e27729d1c391216dbf5edb9f9cbf2073e3328`. Recovery files and the downloaded pre-retirement Worker are stored outside both public repositories.

The authoritative Worker retirement was deployed as version `2207726d-2959-461f-97f5-f3b3345f332d`, replacing `52cc92cf-e02d-42f4-aa5f-bdf29e4b1d85`. Its bundle was compared against the downloaded live baseline before release; only retirement handling changed. No D1 rows or R2 objects were deleted.

## Scope

- Remove public navigation to the map and log, and the map sitemap entry.
- Replace `/practice-map/`, `/log/` and `/log/host/` with noindex closure pages. Old emailed URLs reach the notice without forwarding their credentials. Existing Beings Club redirects remain compatible.
- Remove the Practice Log from the Beyond Belief course resources. Keep the separate Beyond Belief written companion.
- Remove lab/practice partner promises from the Beyond Belief course, companion and print view. The two remaining course resources are the written companion and private line to John.
- Keep source history, all D1 records and private R2 objects. No participant emails announcing closure have been authorised or sent.
- Preserve authenticated deletion and independent giving-management endpoints. The closure page directs record-copy/deletion enquiries to John.

## Shared infrastructure: critical

The live `practice-log.beingsclub.workers.dev` Worker is owned by the **Beings Club/practice-log** checkout. It also runs membership, member emails, Cal.com/Stripe webhooks and Notion sync. Do not delete it, its secrets, cron, databases or buckets. Do not deploy the stale Space to Be Worker over it. The local package deployment command now refuses that operation.

Both checkouts contain a `PRACTICE_LOG_RETIRED` switch. The authoritative Beings Club version returns 410 for log operations and skips only `runNudges`; club services remain enabled. The Space to Be copy is retained for reference, not deployment.

## Release gates

1. Obtain explicit deployment approval. Confirm that this ends existing participant access and log emails, not just public signup.
2. Recheck the live Worker version/configuration against the Beings Club source and ensure no unrelated changes would ship.
3. Export `practice-log` D1 (ID `8cf3af32-666c-48fb-a943-9c38c393d24c`) to a private folder **outside both public repositories**. Do not print its contents. Record a SHA-256 hash, import into a temporary local SQLite database, run `PRAGMA integrity_check`, and compare table counts with live aggregate counts. Do not deploy if backup recovery fails. R2 is retained untouched; do not remove bindings or objects.
4. Run tests in both `practice-log` checkouts and the Space to Be retirement checks/build guard. The 13 September local test run passed 151 shared-backend tests and 69 archived-backend tests, including retirement cases.
5. Deploy **only** the authoritative Beings Club Worker retirement change. Preserve live secrets and all membership configuration. No D1 mutation is required. Verify `/api/health` stays 200, log state/join/login/mark/private-line routes return 410, and club routes still operate with their ordinary authentication and emails. Do not create real signups or send test emails without scoped approval.
6. Publish the scoped Space to Be static changes, leaving unrelated companion indexing drafts untouched. Verify exact served bytes, closure routes, navigation and direct Beyond Belief access.

## Recovery

Page contents are recoverable from commit `2cc83d5` and earlier history. Restore only the affected routes and links if requested. The backend can be reopened by setting `PRACTICE_LOG_RETIRED` to `false` in the authoritative checkout and redeploying, but doing so also resumes log email scheduling; require approval first. No records are deleted during retirement.

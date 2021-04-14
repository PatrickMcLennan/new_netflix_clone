# Netflix Clone

A GraphQL / TypeScript clone of netflix for the media on my home NAS.  

 - Front End is built with Next.js, styled-components, jest & Framer Motion, then compiled into raw html with `next export`.
 - Back End uses express.js, apollo-server-express & knex.js.

4 Docker containers then serve:
 - `nginx` container runs an nginx instance, serving outputted HTML from Next.js & caches static assets
 - `nodejs` container serves compiled express.js server
 - `mysql` container serves MySQL server + DB
 - `redis` container serves redis instance for auth

#### Next Steps:
 1. BUG - `npx knex migrate:latest` not working -- no tables being created. 
    - `calling knex without a tableName is deprecated. Use knex.queryBuilder() instead.  Error: ER_NO_TABLES_USED: No tables used`

 2. BUG - jest not picking up form input events and or submit event.

 3. `swc` inside of docker doing some weird things -- investigate

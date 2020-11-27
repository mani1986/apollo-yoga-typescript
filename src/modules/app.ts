import { GraphQLModule } from "@graphql-modules/core";

import { CommonModule } from "./common";
// import { AuthModule } from './auth';
// import { UserModule } from "./user";

export const AppModule = new GraphQLModule({
    imports: ({ config: { } }) => [
        CommonModule.forRoot({
        }),
        // AuthModule,
        // UserModule,
    ],
    configRequired: true,
});

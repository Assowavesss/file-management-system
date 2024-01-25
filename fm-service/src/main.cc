#include "utils.h"

#include <drogon/drogon.h>

using namespace drogon;
using namespace famy_utils;

int
main()
{
  app()
    .registerPostHandlingAdvice(
      [](const HttpRequestPtr& req, const HttpResponsePtr& resp)
      { resp->addHeader("Access-Control-Allow-Origin", "*"); }
    )
    .addListener(
      loadEnv("ACCOUNT_SERVICE_HOST", "127.0.0.1"),
      std::stoul(loadEnv("ACCOUNT_SERVICE_PORT", "81"))
    )
    .createDbClient(
      loadEnv("ACCOUNT_DB_TYPE", "postgres"),
      loadEnv("ACCOUNT_DB_HOST", "127.0.0.1"),
      std::stoul(loadEnv("ACCOUNT_DB_PORT", "5432")),
      loadEnv("ACCOUNT_DB_NAME", "famy_account"),
      loadEnv("ACCOUNT_DB_USER", "postgres"),
      loadEnv("ACCOUNT_DB_PASSWORD", "root"),
      1,
      "",
      loadEnv("ACCOUNT_DB_CLIENT_NAME", "default"),
      true,
      loadEnv("ACCOUNT_DB_ENCODING"),
      -1.0,
      true
    );

  app().addPlugin(
    "drogon::famy_account::plugin::JWTPlugin",
    {},
    createJsonResponse(
      std::make_pair("issuer", loadEnv("ACCOUNT_TOKEN_ISSUER", "api.famy")),
      std::make_pair("audience", loadEnv("ACCOUNT_TOKEN_AUDIENCE", "famy.com")),
      std::make_pair(
        "privateKey",
        loadEnv("ACCOUNT_TOKEN_PRIVATE_KEY", "blablaa")
      )
    )
  );

  app().run();
}

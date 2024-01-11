
// Filter includes
#include "SignInFilter.h"

// Project includes
#include "utils.h"

namespace drogon::famy_account::filter
{
void
SignInFilter::doFilter(
  const HttpRequestPtr& req,
  FilterCallback&& fcb,
  FilterChainCallback&& fccb
)
{
  // using statements
  using drogon::famy_utils::createHttpResponse;
  using drogon::famy_utils::createJsonResponse;

  if(const auto& jsonRequest = req->getJsonObject();
     req->method() == Options ||
     jsonRequest && jsonRequest->size() == mandatoryLineNumber &&
       jsonRequest->isMember(Account::Cols::_email) &&
       jsonRequest->isMember(Account::Cols::_password))
  {
    fccb();
  }
  else
  {
    fcb(createHttpResponse(
      std::move(createJsonResponse(
        std::make_pair("code", "UNAUTHORIZED"),
        std::make_pair("message", "Unauthorized access")
      )),
      k401Unauthorized
    ));
  }
}

}   // namespace drogon::famy_account::filter

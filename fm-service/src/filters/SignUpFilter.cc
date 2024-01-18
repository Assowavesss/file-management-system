
// Filter includes
#include "SignUpFilter.h"

// Project includes
#include "utils.h"

namespace drogon::famy_account::filter
{
void
SignUpFilter::doFilter(
  const HttpRequestPtr& req,
  FilterCallback&& fcb,
  FilterChainCallback&& fccb
)
{
  // using statements
  using drogon::famy_utils::createHttpResponse;
  using drogon::famy_utils::createJsonResponse;

  if(const auto& jsonRequest = req->getJsonObject();
     jsonRequest && jsonRequest->size() == mandatoryLineNumber &&
     jsonRequest->isMember(Account::Cols::_first_name) &&
     jsonRequest->isMember(Account::Cols::_last_name) &&
     jsonRequest->isMember(Account::Cols::_email) &&
     jsonRequest->isMember(Account::Cols::_password) &&
     jsonRequest->isMember(Account::Cols::_role_id))
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

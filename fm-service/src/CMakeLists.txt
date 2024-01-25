cmake_minimum_required(VERSION 3.5)

if(MSVC)
    add_definitions(-D_CRT_SECURE_NO_WARNINGS)
endif()

find_package(Drogon CONFIG REQUIRED)
find_package(OpenSSL REQUIRED)
find_path(JWT_CPP_INCLUDE_DIRS "jwt-cpp/base.h")
find_package(libpqxx CONFIG REQUIRED)

add_executable(${PROJECT_NAME} main.cc)

target_compile_options(${PROJECT_NAME} PRIVATE "-fcoroutines")

target_link_libraries(${PROJECT_NAME} 
		      PRIVATE 
		      Drogon::Drogon
		      OpenSSL::SSL
		      libpqxx::pqxx
                      OpenSSL::Crypto
)

target_include_directories(${PROJECT_NAME} 
			   PRIVATE 
                           ${JWT_CPP_INCLUDE_DIRS} 
                           ${UTIL_DIR}
)

if(DEPLOY)
	target_compile_definitions(${PROJECT_NAME} PRIVATE DEPLOY=1)
endif()

add_subdirectory(plugins)
add_subdirectory(models)
add_subdirectory(controllers)
add_subdirectory(filters)

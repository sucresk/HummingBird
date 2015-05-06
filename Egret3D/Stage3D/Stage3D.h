#ifdef _MSC_VER
#pragma warning(disable: 4251)
#pragma warning(disable: 4275)
#endif

#ifndef STAGE3D_API_H
#define STAGE3D_API_H

# ifdef STAGE3D_API
        /* We are building this library */
#      define STAGE3D_API __declspec(dllexport)
#else
        /* We are using this library */
#      define STAGE3D_API __declspec(dllimport)
#  endif

#endif



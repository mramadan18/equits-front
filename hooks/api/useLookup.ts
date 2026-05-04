import { useQuery } from "@tanstack/react-query";
import { lookupService } from "@/services/lookup.service";
import {
  ApiResponse,
  City,
  Country,
  Faculty,
  Industry,
  University,
} from "@/types/api";
import { ApiError } from "@/types/error";

export const useUniversities = () => {
  return useQuery<ApiResponse<University[]>, ApiError>({
    queryKey: ["universities"],
    queryFn: () => lookupService.getUniversities(),
  });
};

export const useFaculties = () => {
  return useQuery<ApiResponse<Faculty[]>, ApiError>({
    queryKey: ["faculties"],
    queryFn: () => lookupService.getFaculties(),
  });
};

export const useIndustries = () => {
  return useQuery<ApiResponse<Industry[]>, ApiError>({
    queryKey: ["industries"],
    queryFn: () => lookupService.getIndustries(),
  });
};

export const useCountries = () => {
  return useQuery<ApiResponse<Country[]>, ApiError>({
    queryKey: ["countries"],
    queryFn: () => lookupService.getCountries(),
  });
};

export const useCities = (countryId?: number) => {
  return useQuery<ApiResponse<City[]>, ApiError>({
    queryKey: ["cities", countryId],
    queryFn: () => lookupService.getCities(countryId),
    enabled: !!countryId,
  });
};

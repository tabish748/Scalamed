
import pharmacyRepository from "../../repositories/pharmacy/pharmacy-repository.js";

export async function findSearchTermSuggestions(data) {
  try {
    const response = await pharmacyRepository.findSearchTermSuggestions(data);
    return response;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}



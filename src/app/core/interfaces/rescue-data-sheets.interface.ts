export interface RescueDataSheet {
  error: boolean,
  code: number,
  request_id: number,
  description: string,
  error_hash: string,
  reg_info: {
    make: string,
    model: string,
    year: number
  },
  rescue_cards: RescueCard[]
}

export interface RescueCard {
      card_number: number,
      make: string,
      model: string,
      year_from: number,
      year_to: number,
      body_type: string,
      engine: string,
      fuel: string,
      fuel_alternative: string,
      engine_capacity_ccm: number,
      number_of_doors: number,
      line: string,
      version: string,
      generation: string,
      series: string,
      card_link: string
}

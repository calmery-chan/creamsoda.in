# frozen_string_literal: true

json.data do
  json.array! @serial_codes, partial: 'serial_code', as: :serial_code
end

json.data do
  json.array! @serial_codes do |serial_code|
    json.call(
      serial_code,
      :id,
      :serial_code,
      :state
    )
  end
end
# frozen_string_literal: true

json.data do
  json.works do
    json.array! @works, partial: 'work', as: :work
  end
end
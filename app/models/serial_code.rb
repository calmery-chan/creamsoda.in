# frozen_string_literal: true

class SerialCode < ApplicationRecord
  after_initialize :default_serial_code

  enum state: { created: 0, allowed: 1, denied: 2 }

  private

  def default_serial_code
    self.serial_code ||= SecureRandom.hex(8)
  end
end

CREATE TABLE reservations (
    Id VARCHAR(36) NOT NULL,
    PropertyId VARCHAR(36) NOT NULL,
    UserId VARCHAR(36) NOT NULL,
    PropertyTitle VARCHAR(255),
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    NumberOfGuests INT NOT NULL,
    TotalPrice DECIMAL NOT NULL,
    Status VARCHAR(36) NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (PropertyId) REFERENCES properties(Id),
    FOREIGN KEY (UserId) REFERENCES users(Id)
);
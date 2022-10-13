import {
    IsNumber,
    IsOptional,
    Max,
    Min,
  } from 'class-validator';
  import { ApiPropertyOptional } from '@nestjs/swagger';
  import { Transform } from 'class-transformer';
  
  export class QueryDto {
    @ApiPropertyOptional({
      type: [String],
      example: ['Purple'],
    })
    @IsOptional()
    color?: string[];

    @ApiPropertyOptional({
        type: [String],
        example: ['any'],
    })
    @IsOptional()
    category?: string[];

    @ApiPropertyOptional({
        type: [String],
        example: [0, 320],
    })
    @Min(0)
    @Max(500)
    @IsOptional()
    price?: number[];

    @ApiPropertyOptional({
      type: Number,
      example: 0,
    })
    @IsNumber()
    @Transform(({ value }) => +value)
    @IsOptional()
    @Max(500)
    skip?: number;
  
    @ApiPropertyOptional({
      type: Number,
      example: 10,
    })
    @IsOptional()
    @Transform(({ value }) => +value)
    @IsNumber()
    @Min(0)
    @Max(10)
    limit?: number;
  }
  
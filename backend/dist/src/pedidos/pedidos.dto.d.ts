export declare class ItemPedidoDto {
    produtoId: number;
    quantidade: number;
}
export declare class NovoPedidoDto {
    clienteId: number;
    itens: ItemPedidoDto[];
}
